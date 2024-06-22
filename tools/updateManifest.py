#!/usr/bin/python3
# -*- coding:utf8 -*-
import os
import sys
import shutil
import re

def delete_dir(dir_path):
    if os.path.exists(dir_path):
        shutil.rmtree(dir_path)
        print("文件夹删除成功"+dir_path)
    else:
        print("文件不存在"+dir_path)

remote_assets_path = "/Users/mac/Desktop/All/Cocos/MyCocosPrac/MyCocos222/jsb-default/remote-assets"
# 打包完成后，jsb-default里面的res资源和src代码资源都是最新的，这些需要传给远程热更包
srcFile = "/Users/mac/Desktop/All/Cocos/MyCocosPrac/MyCocos222/jsb-default"

print("----------------------删除remote-assets-------------")
delete_dir(remote_assets_path)
print("----------------------删除remote-assets成功-------------")


print("----------------------更新manifest到jsb-default/remote-assets-------------")
os.system("node ./tools/version_generator.js")
print("----------------------更新manifest完成-------------")

src = srcFile + "/src"
dst = remote_assets_path +"/src"
shutil.copytree(src, dst)
print("拷贝最新的src到remote-assets成功")

src = srcFile + "/res"
dst = remote_assets_path +"/res"
shutil.copytree(src, dst)
print("拷贝最新的res到remote-assets成功")


