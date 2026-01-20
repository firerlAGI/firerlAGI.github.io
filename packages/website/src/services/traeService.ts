// Trae API 服务

const getTraeConnectionStatus = async (): Promise<{ status: string; message: string }> => {
  try {
    const apiKey = import.meta.env.PUBLIC_TRAE_API_KEY || import.meta.env.TRAE_API_KEY;
    
    if (!apiKey) {
      return {
        status: 'error',
        message: 'Trae API Key not found in environment variables'
      };
    }

    // 测试Trae API连接
    // 注意：这里使用一个假设的Trae API端点，实际使用时需要替换为正确的端点
    const response = await fetch('https://api.trae.ai/v1/health', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      return {
        status: 'success',
        message: 'Trae API connection established successfully'
      };
    } else {
      return {
        status: 'error',
        message: `Trae API returned error: ${response.status} ${response.statusText}`
      };
    }
  } catch (error) {
    console.error('Error testing Trae connection:', error);
    return {
      status: 'error',
      message: `Failed to connect to Trae API: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// 示例：调用Trae API进行其他操作
const callTraeApi = async (endpoint: string, method: string = 'GET', data?: any) => {
  try {
    const apiKey = import.meta.env.PUBLIC_TRAE_API_KEY || import.meta.env.TRAE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Trae API Key not found in environment variables');
    }

    const response = await fetch(`https://api.trae.ai/v1/${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      ...(data && {
        body: JSON.stringify(data)
      })
    });

    return await response.json();
  } catch (error) {
    console.error(`Error calling Trae API ${endpoint}:`, error);
    throw error;
  }
};

export { getTraeConnectionStatus, callTraeApi };
