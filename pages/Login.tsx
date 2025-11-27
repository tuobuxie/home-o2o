import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Lock, User, AlertCircle, ChevronLeft } from 'lucide-react';
import { MOCK_USER } from '../services/mockData';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 获取之前的页面路径，登录后跳回
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('账号或密码错误');
      }
    } catch (err) {
      setError('登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 填充测试账号
  const fillMockData = () => {
    setUsername(MOCK_USER.username);
    setPassword(MOCK_USER.password);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 顶部导航 */}
      <div className="p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="px-8 pt-4 pb-12 flex flex-col justify-center min-h-[60vh]">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
            <p className="text-gray-500">请登录以继续您的服务预约</p>
        </div>

        {/* 提示栏 */}
        <div 
            onClick={fillMockData}
            className="mb-8 bg-teal-50 border border-teal-100 p-3 rounded-lg flex items-start space-x-2 cursor-pointer active:scale-[0.98] transition-transform"
        >
            <AlertCircle size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-teal-800">
                <p className="font-bold mb-1">测试账号 (点击一键填充):</p>
                <p>账号: {MOCK_USER.username}</p>
                <p>密码: {MOCK_USER.password}</p>
            </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">账号</label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full h-12 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 pl-11 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="请输入账号"
                    />
                    <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">密码</label>
                <div className="relative">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 pl-11 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        placeholder="请输入密码"
                    />
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded">
                    <AlertCircle size={14} className="mr-1" />
                    {error}
                </div>
            )}

            <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                className="h-12 text-lg shadow-lg shadow-teal-200"
                isLoading={loading}
            >
                登录
            </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
            还没有账号？ <span className="text-teal-600 font-medium">立即注册</span>
        </div>
      </div>
    </div>
  );
};