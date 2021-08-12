import React, { memo, useMemo } from 'react';
import { Col, Form, Input, Row } from 'antd';

const { TextArea } = Input;

const DataModalContent = ({ modalData, recordKey, columnsObj }) => {
  const modalDataKeys = useMemo(() => Object.keys(modalData), [modalData]);

  return (
    <Form
      style={{ marginTop: '32px' }}
      layout={'horizontal'}
      labelCol={{ span: 10 }}
    >
      <Row gutter={[8, 8]}>
        {modalDataKeys.map((dataKey, index) => (
          <Col span={12} key={`modal_${recordKey}_${index}`}>
            <Form.Item
              key={`modal_${recordKey}_${index}`}
              name={dataKey}
              label={columnsObj[dataKey]}
              initialValue={modalData[dataKey]}
            >
              <TextArea disabled autoSize={{ minRows: 1 }} />
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default memo(DataModalContent);
