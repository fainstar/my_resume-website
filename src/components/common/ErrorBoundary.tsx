import { Component, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 錯誤邊界組件
 * 用於捕獲子組件樹中的 JavaScript 錯誤，記錄錯誤並顯示備用 UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 使下一次渲染能夠顯示降級 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error);
    console.error('Error details:', errorInfo);
    // 可以在这里添加更多的错误处理逻辑，例如发送错误报告
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 你可以自定義降級 UI 並渲染
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <Result
          status="error"
          title="發生錯誤"
          subTitle={this.state.error?.message || '渲染過程中發生了錯誤'}
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              重新整理頁面
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;