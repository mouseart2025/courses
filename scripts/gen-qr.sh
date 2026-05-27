#!/usr/bin/env bash
# 生成合作需求表单二维码 → public/qr-partnership.png
#
# 用法：
#   pnpm qr                          # 用默认占位链接
#   pnpm qr https://your-form-url    # 用真实表单页链接重新生成
#
# 说明：二维码是静态资产，提交进 public/，不在构建期生成
# （Docker builder 镜像 node:22-alpine 没有 qrencode）。
# 换真实表单链接时，跑 `pnpm qr <url>` 重新生成并提交即可。
#
# 依赖：qrencode（macOS: brew install qrencode）
set -euo pipefail

# TODO: mcv.chaihuo.org 是占位链接，上线前替换为真实合作需求表单页地址
URL="${1:-https://mcv.chaihuo.org}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/qr-partnership.png"

if ! command -v qrencode >/dev/null 2>&1; then
  echo "错误：未找到 qrencode。请先安装：brew install qrencode" >&2
  exit 1
fi

qrencode -o "$OUT" -s 10 -m 2 --level=M "$URL"
echo "已生成 $OUT  ←  $URL"
