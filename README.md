# 婴儿舒适状态监测 App 原型

这是 Codex 第一阶段交付的功能原型，重点是数据流、页面功能、状态确认和后续蓝牙接入扩展点。当前版本使用本地 mock 数据模拟蓝牙模块上传的 JSON。

## 运行方式

```bash
python -m http.server 5173
```

然后打开：

```txt
http://localhost:5173
```

## 当前范围

- 今日：实时画面占位、当前状态、今日指标、最近事件确认。
- 趋势：24 小时舒适状态指数折线图，点击小时查看情绪构成。
- 记录：手动添加进食、睡眠、哭闹记录。
- 开心高光：瀑布流照片、描述和时间戳。
- 安全事件中心：安全事件总次数、待确认数量、确认交互。

## 重要产品边界

- 分数名称为“舒适状态指数”，不是健康分或诊断结果。
- 数据覆盖率低于 50% 时显示“数据不足”，不按 0 分处理。
- 安全事件状态只有“待确认”和“已确认”。
- V1 不发送警报，只保留 `alertService.js` 扩展接口，后续可接手机推送、设备声音或其他通知链路。

## 假数据位置

- `src/data/mock/realtime-samples.json`：模拟蓝牙模块每 5 秒上传的实时 JSON。
- `src/data/mock/daily-emotion-plan.json`：模拟一天内各小时情绪窗口构成。
- `src/data/mock/events.json`：模拟哭闹、安全事件和高光时刻。
- `src/data/mock/manual-records.json`：模拟用户手动记录。

## 后续接真实蓝牙

真实蓝牙数据建议转换为 `src/domain/types.js` 中的 `BluetoothPayload` 结构，然后通过：

```js
store.ingestBluetoothPayload(payload)
```

传入应用。当前 mock 数据由 `src/services/dataFeed.js` 读取，后续替换这个服务即可，页面和评分算法不需要重写。
