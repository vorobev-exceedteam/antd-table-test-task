import React, { memo } from 'react';
import { Button, Col, Row } from 'antd';
import useMethods from '../hooks/useMethods';

const ContextMenu = ({ visible, x, y, menuData, args }) => {
  const [, callMethod] = useMethods('table');

  return (
    visible && (
      <div className={'popup'} style={{ left: `${x}px`, top: `${y}px` }}>
        <Row>
          {menuData.map(({ ord, name, caption, method }) => (
            <Col span={24} order={ord} key={`context_menu_${name}`}>
              <Button
                block
                onClick={() => callMethod(method, ...args)}
                type={'text'}
              >
                {caption}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
};

export default memo(ContextMenu);
