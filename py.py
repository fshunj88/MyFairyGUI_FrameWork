#!/usr/bin/python3
# -*- coding:utf8 -*-
import re

old_path = "/Users/mac/Desktop/MyFairyGUI_FrameWork/README.md"
new_path = "/Users/mac/Desktop/MyFairyGUI_FrameWork/NewREADME.md"
old_file = open(old_path, 'r', encoding='utf-8')
new_file = open(new_path, 'w', encoding='utf-8')

old_line = old_file.readline()
count = 0

while old_line:
    if "![" in old_line:
        url = re.findall('https://.*png|https://.*jpeg|https://.*jpg', old_line)
        img = '<img src="' + url[0] + '"/>'
        new_line = re.sub('!\[.*\)', img, old_line)
        new_file.write(new_line)
        print(old_line + '   ===>   ' + new_line)
        count += 1
    else:
        new_file.write(old_line)
    old_line = old_file.readline()

old_file.close()
new_file.close()

print('\n已成功替换' + str(count) + '处外链问题')

