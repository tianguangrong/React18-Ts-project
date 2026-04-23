import React, { useState } from "react";
import { Button, Drawer, Flex, Space } from "antd";

type RecordPiece = {
  time: string;
  msg: string;
};
interface IchargingItem<T> {
  id: string;
  voltage: string;
  current: string;
  power: string;
  tem: string;
  status: number;
  record?: T;
}
const RecordElement: React.FC<{
  recordDetail: Array<RecordPiece>;
}> = ({ recordDetail }) => {
  return recordDetail.map((item: RecordPiece) => (
    <div style={{ margin: "8px 0" }}>
      <div>
        <span>充电时间：</span>
        <span>{item?.time}</span>
      </div>
      <div>
        <span>充电详情：</span>
        <span>{item?.msg}</span>
      </div>
    </div>
  ));
};
const Record: React.FC<{
  open: boolean;
  detail: IchargingItem<RecordPiece>;
  onClose: () => void;
  filterStatusForLabel: (status: number) => string;
}> = ({ open, detail, onClose, filterStatusForLabel }) => {
  return (
    <>
      <Drawer
        title="使用记录"
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>关闭</Button>
            <Button onClick={onClose} type="primary">
              提交
            </Button>
          </Space>
        }
      >
        <Flex vertical={true} gap="large">
          <Flex vertical={false}>
            <span>充电站名称/ID：</span>
            <h4>{detail?.id}</h4>
          </Flex>
          <Flex vertical={false}>
            <span>充电站状态：</span>
            <h4>{detail?.status && filterStatusForLabel(detail.status)}</h4>
          </Flex>
          <div>
            <span>充电站电压：</span>
            <span>{detail?.voltage}</span>
          </div>
          <div>
            <span>充电站电流：</span>
            <span>{detail?.current}</span>
          </div>
          <div>
            <span>充电站功率：</span>
            <span>{detail?.power}</span>
          </div>
          <div>
            <span>充电站温度：</span>
            <span>{detail?.tem}</span>
          </div>

          <div>
            <h4>
              充电站充电记录：<span>{detail?.record ? null : "- -"}</span>
            </h4>
            <span>
              {detail?.record ? (
                <RecordElement recordDetail={detail?.record as any ?? [{time: '', msg: ''}]} />
              ) : null}
            </span>
          </div>
        </Flex>
      </Drawer>
    </>
  );
};
export default Record;
