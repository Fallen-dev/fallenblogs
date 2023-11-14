---
title: Setup LVM on Debian - Wiki
description: A documentation on how to setup LVM on Debian. Documentation written by Debian.
date: "2023-11-14 11:13"
category: Linux
image:
  src: $assets/pexels-pixabay-33278.jpg
  credit: Photo by Pixabay
  link: https://www.pexels.com/photo/silver-hard-drive-interals-33278/
---
LVM is a **Logical Volume Manager** for the Linux operating system.

Read this documentation on [https://wiki.debian.org/LVM](Debian Wiki page).

# Presentation

Logical volume management provides a higher-level view of the disk storage on a computer system than the traditional view of disks and partitions. This gives the system administrator much more flexibility in allocating storage to applications and users.

Storage volumes created under the control of the logical volume manager can be resized and moved around almost at will.

## Definitions

- **PV** : Physical Volumes. This means the hard disk, hard disk partitions, RAID or LUNs from a SAN which form "Physical Volumes" (or PVs).
    
- **VG** : Volume Groups. This is a collection of one or more Physical Volumes.
    
- **LV** : Logical Volumes. LVs sit inside a Volume Group and form, in effect, a virtual partition.
    
- **PE** : Physical Extents. In order to manipulate the actual data, it is divided into blocks of data called **P**hysical **E**xtents.
    
- **LE** : Logical Extents. Similar to Physical Extents, but at the Logical Volume level. Physical Extents are to Physical Volumes as Logical Extents are to Logical Volumes. The size of blocks are the same for each logical volume (LV) in the same volume group (VG).
    

An example

```
||-------------------------OS----------------------------||
||-------------------------LVM---------------------------||
||  LV-1 (/)    |LV-2 (swap)|  LV 3 (/home) | LV-4 (/tmp)|| Logical Volumes(LV)
||------------------------------------------|------------||
||                  VG 1                    |    VG 2    || Volume Groups(VG)
||------------------------------------------|------------||
||  /dev/sda2 |    /dev/sda3    | /dev/sdb2 | /dev/sdd4  || Physical Volumes(PV)
||-------------------------------------------------------||

```
## Good to know

### Encrypted LVM

When formatting a LVM volume, you can choose between encrypted LVM or _not_ encrypted LVM. To protect the confidentiality of your valuable data, for instance in the event of the loss or theft of your computer or storage, such as volume, solid state disk, or hard drive, when formatting a LVM volume it is suggested to consider formatting it using the _encrypted LVM_ option.

![<!>](https://wiki.debian.org/htdocs/debwiki/img/attention.png "<!>") If you choose the encrypted LVM option, it is suggested to consider creating [backup passwords](https://wiki.debian.org/LVM#Backup_passwords). So that recovery is quick and easy ![:)](https://wiki.debian.org/htdocs/debwiki/img/smile.png ":)") Otherwise it the event that somehow your password is not working, you risk permanently losing all your valuable data. It is surprisingly frequent that people lose all their data because somehow their password is no longer working, and they did not created backup passwords. Encrypted LVM is very strong, so if somehow you locked yourself out, unless you have backup passwords it is likely that you would be permanently locked out ![:(](https://wiki.debian.org/htdocs/debwiki/img/sad.png ":(")

Note: The password(s) of a encrypted LVM volume are stored inside its Linux Unified Key Setup (LUKS) header(s). Creating backup passwords is important because if in the future somehow you first password is no longer working, or you simply forget your password, or you do remember your password but something unexpected happens such as a bug after a kernel update and somehow the password is no longer working, then without backup password(s) you risk to permanently lose all your valuable data stored into that encrypted LVM storage.

#### Encrypted LVM swap partition

When an encrypted LVM partition is used, the encryption key is stored in memory (RAM). Since retrieving this key allows the decryption of the data, it is of recommended to avoid leaving a copy of this key that would be accessible to the possible thief of the computer or volume, or to a maintenance technician. This is however something that can easily occur with a laptop, since when hibernating the contents of RAM is stored on the swap partition. If this partition isn't encrypted, the thief may access the key and use it to decrypt the data from the encrypted partitions. This is why, when you use LVM encrypted partitions, it is recommended to also encrypt the swap partition. The Debian installer will warn you or the users if they try to make an LVM encrypted partition while the swap partition is not encrypted. [Source](https://debian-handbook.info/browse/stable/sect.installation-steps.html).

### Labels

You should use labels for Logical Volume (LV) identification in /etc/fstab, instead of UUIDs or the kernel naming rules (/dev/sda) in order to avoid conflicts with the restoration of volume snapshots.

### /boot

Since [DebianSqueeze](https://wiki.debian.org/DebianSqueeze) [Grub](https://wiki.debian.org/Grub) v2, which can read files directly from LVM and RAID devices is the default Debian bootloader.

If you plan to encrypt your root filesystem /boot may need to be located in a separate unencrypted Logical Volume or partition. Refer to the [Cryptsetup](https://wiki.debian.org/Cryptsetup) documentation for more information.

GRUB v1 and [LILO](https://wiki.debian.org/LILO) are not compatible with LVM, if you use one of those legacy bootloaders /boot should be outside the storage disk managed by LVM.

### LVM2 snapshots and udev on Debian

There are some caveats when creating LVM snapshots on Debian with udev, see [343671](https://bugs.debian.org/343671 "Closed: #343671: udev: LVM snapshots don't work")

### LVM cached volumes

To use [lvmcache(7)](https://manpages.debian.org/man/7/lvmcache "DebianMan") your system must have the [thin-provisioning-tools](https://packages.debian.org/thin-provisioning-tools "DebianPkg") installed for its [cache_check](https://manpages.debian.org/man/cache_check "DebianMan") tool, otherwise cached volumes will not be available at boot. This could result in the system being unbootable without manual intervention.

# Installation

All tools to manage an LVM volume are available in [lvm2](https://packages.debian.org/lvm2 "DebianPkg") package

sudo apt install lvm2

That's all. If you have a very old Debian (before 2018) also try to start the main service:

sudo service lvm2 start

This is not needed in recent Debian versions (for example in Debian buster it's not necessary).

If needed, you can install [system-config-lvm](https://packages.debian.org/system-config-lvm "DebianPkg"), it's a utility for graphically configuring Logical Volumes.

sudo apt install system-config-lvm

## List of LVM commands

- **lvmchange** — Change attributes of the Logical Volume Manager.
    
- **lvmdiskscan** — Scan for all devices visible to LVM2.
    
- **lvmdump** — Create lvm2 information dumps for diagnostic purposes.
    

# Physical Volumes (PV)

## Create a PV

To declare the /dev/sda2 as a physical volume available for the LVM:

sudo pvcreate /dev/sda2

## Remove a PV

In order to remove the Physical Volume (PV) on /dev/sda2 all data must be moved off it. To do this, make sure other physical volumes containing the same volume group have enough free space and then issue this command:

pvmove /dev/sda2

After the data is moved off the disk, remove it from the volume group (in this case, the one named myVirtualGroup1:

sudo vgreduce myVirtualGroup1 /dev/sda2

And after these preparations finally:

sudo pvremove /dev/sda2

## List of PV commands

- **pvchange** — Change attributes of a Physical Volume.
    
- **pvck** — Check Physical Volume metadata.
    
- **pvcreate** — Initialize a disk or partition for use by LVM.
    
- **pvdisplay** — Display attributes of a Physical Volume.
    
- **pvmove** — Move Physical Extents.
    
- **pvremove** — Remove a Physical Volume.
    
- **pvresize** — Resize a disk or partition in use by LVM2.
    
- **pvs** — Report information about Physical Volumes.
    
- **pvscan** — Scan all disks for Physical Volumes.
    

# Volume Groups (VG)

## Create a volume group of physical volume

sudo vgcreate myVirtualGroup1 /dev/sda2

## Extend a volume group

Declare another physical volume:

sudo pvcreate /dev/sda3

Then add the new PV to the VG that already exists:

sudo vgextend myVirtualGroup1 /dev/sda3

## Renaming a volume group

Renaming a volume group can be tricky of the it contains the root or swap partition. In that case it should be insured that the old names are still accessible via /dev/mapper until a full reboot cycle is complete.

```bash
sudo vgrename somename-vg vgsomename
cd /dev/mapper
ls somename-vg*
## somename--vg-lv1
## somename--vg-lv2

sudo ln -s vgsomename-lv1   somename--vg-lv1
sudo ln -s vgsomename-lv2   somename--vg-lv2

# if logical volumes of the group are contained in /etc/fstab:

sudo sed -i 's#/dev/mapper/somename--vg-#/dev/vgsomename/#g' /etc/fstab
# if logical volumes of the group are contained in /boot/grub/grub.cfg:

sudo sed -i 's#/dev/mapper/somename--vg-#/dev/vgsomename/#g' /boot/grub/grub.cfg  # this is only good for the initramfs run and the initial next reboot
sudo update-initramfs -c -k all
sudo reboot
sudo update-grub #creating final /boot/grub/grub.cfg
```

## Verify VG configuration

Simply run this command:

sudo vgdisplay

## List of VG commands

- **vgcfgbackup** — Backup Volume Group descriptor area.
    
- **vgcfgrestore** — Restore Volume Group descriptor area.
    
- **vgchange** — Change attributes of a Volume Group.
    
- **vgck** — Check Volume Group metadata.
    
- **vgconvert** — Convert Volume Group metadata format.
    
- **vgcreate** — Create a Volume Group.
    
- **vgdisplay** — Display attributes of Volume Groups.
    
- **vgexport** — Make volume Groups unknown to the system.
    
- **vgextend** — Add Physical Volumes to a Volume Group.
    
- **vgimport** — Make exported Volume Groups known to the system.
    
- **vgimportclone** — Import and rename duplicated Volume Group (e.g. a hardware snapshot).
    
- **vgmerge** — Merge two Volume Groups.
    
- **vgmknodes** — Recreate Volume Group directory and Logical Volume special files
    
- **vgreduce** — Reduce a Volume Group by removing one or more Physical Volumes.
    
- **vgremove** — Remove a Volume Group.
    
- **vgrename** — Rename a Volume Group.
    
- **vgs** — Report information about Volume Groups.
    
- **vgscan** — Scan all disks for Volume Groups and rebuild caches.
    
- **vgsplit** — Split a Volume Group into two, moving any logical volumes from one Volume Group to another by moving entire Physical Volumes.
    

# Logical Volumes (LV)

## Create an LV

![<!>](https://wiki.debian.org/htdocs/debwiki/img/attention.png "<!>") Don't forget to check that you have enough space: naturally, an LV of 100 GB (Giga Bytes) doesn't fit in a 10 GB Virtual Group.

Create a logical volume in a volume group:

sudo lvcreate -n myLogicalVolume1 -L 10g myVirtualGroup1

Format the logical volume to the filesystem you want (ext4,xfs...)

sudo mkfs -t ext4 /dev/myVirtualGroup1/myLogicalVolume1

You can test to see if it's working:

mkdir /test
sudo mount /dev/myVirtualGroup1/myLogicalVolume1 /test
df -h

You also can check your logical volumes with:

sudo lvdisplay

## Remove a LV

To remove a logical volume, make sure it is not in use anymore. Then simply issue this command to remove the logical volume myLogicalVolume1 in volume group myVirtualGroup1:

sudo lvremove myVirtualGroup1/myLogicalVolume1

You might get asked if you really want to remove an active logical volume. If so, confirm it.

## List of LV commands

- **lvchange** — Change attributes of a Logical Volume.
    
- **lvconvert** — Convert a Logical Volume from linear to mirror or snapshot.
    
- **lvcreate** — Create a Logical Volume in an existing Volume Group.
    
- **lvdisplay** — Display the attributes of a Logical Volume.
    
- **lvextend** — Extend the size of a Logical Volume.
    
- **lvreduce** — Reduce the size of a Logical Volume.
    
- **lvremove** — Remove a Logical Volume.
    
- **lvrename** — Rename a Logical Volume.
    
- **lvresize** — Resize a Logical Volume.
    
- **lvs** — Report information about Logical Volumes.
    
- **lvscan** — Scan (all disks) for Logical Volumes.
    

# See also:

- Comparison of [Linux volume management](https://wiki.debian.org/Linux%20volume%20management) solutions for Debian users
    
- [https://tldp.org/HOWTO/LVM-HOWTO](https://tldp.org/HOWTO/LVM-HOWTO)
    
- Upstream:
    - [https://sourceware.org/lvm2/](https://sourceware.org/lvm2/) - Homepage, mailing list, IRC...
        
    - [https://sourceware.org/lvm2/wiki/](https://sourceware.org/lvm2/wiki/) - Wiki
        
- [RedHat](https://wiki.debian.org/RedHat):
    
    - [Logical Volume Manager Administration](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_logical_volumes/)