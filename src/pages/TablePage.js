import React, { memo, useCallback, useMemo, useState } from 'react';
import Toolbar from '../components/Toolbar';
import { Col, Modal, Row, Table } from 'antd';
import DataModalContent from '../components/DataModalContent';
import useMethodRegistration from '../hooks/useMethodRegistration';
import useMethods from '../hooks/useMethods';
import useMultipleFetch from '../hooks/useMultipleFetch';
import { fetchData, fetchGrid } from '../data';
import ContextMenu from '../components/ContextMenu';

const TablePage = () => {
  const [isLoading, refetchAll, fetchGridResult, fetchDataResult] =
    useMultipleFetch([fetchGrid, fetchData], [{}, []]);

  const { columns, toolbar, contextOperations, dblClickOperation } =
    fetchGridResult.data;

  const columnsObj = useMemo(
    () =>
      columns &&
      columns.reduce(
        (obj, { dataIndex, title }) => ({ ...obj, [dataIndex]: title }),
        {}
      ),
    [columns]
  );

  const openModal = useCallback(
    (record, recordKey) => {
      Modal.confirm({
        title: 'Record Info',
        centered: true,
        closable: true,
        width: 500,
        icon: null,
        content: (
          <DataModalContent
            modalData={record}
            recordKey={recordKey}
            columnsObj={columnsObj}
          />
        ),
      });
    },
    [columnsObj]
  );

  const exportData = useCallback(
    () => console.log(fetchDataResult.data),
    [fetchDataResult]
  );

  const [contextMenuState, setContextMenuState] = useState({
    visible: false,
    args: [],
    x: 0,
    y: 0,
  });

  const methodsMap = useMemo(
    () => ({ editObject: openModal, refreshPage: refetchAll, exportData }),
    [openModal]
  );

  useMethodRegistration('table', methodsMap);
  const [, callMethod] = useMethods('table');

  return (
    <Row style={{ marginTop: '16px' }} justify={'center'}>
      <ContextMenu menuData={contextOperations} {...contextMenuState} />
      <Col xl={12} md={14} xs={23}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Toolbar loading={isLoading} toolbarData={toolbar} />
          </Col>
          <Col span={24}>
            <Table
              loading={isLoading}
              dataSource={fetchDataResult.data}
              columns={columns}
              onRow={({ key, ...recordData }) => {
                return {
                  onDoubleClick: () =>
                    dblClickOperation &&
                    callMethod(dblClickOperation.method, recordData, key),
                  onContextMenu: (event) => {
                    event.preventDefault();
                    document.addEventListener(
                      `click`,
                      function onClickOutside() {
                        setContextMenuState({
                          ...contextMenuState,
                          visible: false,
                        });
                        document.removeEventListener(`click`, onClickOutside);
                      }
                    );
                    setContextMenuState({
                      visible: true,
                      args: [recordData, key],
                      x: event.clientX,
                      y: event.clientY,
                    });
                  },
                };
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(TablePage);
