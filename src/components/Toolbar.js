import { memo } from 'react';
import { Button, Card, Col, Row, Skeleton, Tooltip } from 'antd';
import useMethods from '../hooks/useMethods';

const Toolbar = ({ loading, toolbarData = [] }) => {
  const [getMethod] = useMethods('table');

  return (
    <Card>
      <Row gutter={[8, 0]} align={'middle'}>
        {loading ? (
          <>
            <Col flex={'row'}>
              <Skeleton.Button />
            </Col>
            <Col flex={'row'}>
              <Skeleton.Button />
            </Col>
            <Col flex={'row'}>
              <Skeleton.Button />
            </Col>
          </>
        ) : (
          toolbarData.map(
            ({
              id,
              operationDescription,
              operationCaption,
              operationOrd,
              operationMethod,
            }) => (
              <Col
                key={`toolbar_button_${id}`}
                flex={'row'}
                order={operationOrd}
              >
                <Tooltip title={operationDescription}>
                  <Button onClick={getMethod(operationMethod)} type="primary">
                    {operationCaption}
                  </Button>
                </Tooltip>
              </Col>
            )
          )
        )}
      </Row>
    </Card>
  );
};

export default memo(Toolbar);
