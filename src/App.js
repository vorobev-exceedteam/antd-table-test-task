import { Layout } from 'antd';
import TablePage from './pages/TablePage';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content className={'main-content'}>
        <TablePage />
      </Content>
    </Layout>
  );
}

export default App;
