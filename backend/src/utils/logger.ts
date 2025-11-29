import * as path from 'path';

interface Logger {
  error(message: string, error?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  debug(message: string, data?: any): void;
}

const getCallerInfo = (): { fileName: string; lineNumber: number } => {
  const stack = new Error().stack;
  if (!stack) {
    return { fileName: 'unknown', lineNumber: 0 };
  }

  // 跳过前4行：Error、getCallerInfo、formatLog、logger方法
  const stackLines = stack.split('\n');
  let callerLine;
  
  // 找到第一个不在logger.ts中的调用行
  for (let i = 2; i < stackLines.length; i++) {
    const line = stackLines[i];
    if (line && !line.includes('logger.ts')) {
      callerLine = line;
      break;
    }
  }
  
  if (!callerLine) {
    return { fileName: 'unknown', lineNumber: 0 };
  }

  // 匹配文件名和行号
  const match = callerLine.match(/at\s+\S+\s+\((.*?):(\d+):(\d+)\)/) || 
                callerLine.match(/at\s+(.*?):(\d+):(\d+)/);
  
  if (match) {
    const fullPath = match[1];
    const fileName = path.basename(fullPath);
    const lineNumber = parseInt(match[2], 10);
    return { fileName, lineNumber };
  }

  return { fileName: 'unknown', lineNumber: 0 };
};

const formatLog = (level: string, message: string, error?: any): string => {
  const now = new Date();
  const timestamp = now.toISOString();
  const { fileName, lineNumber } = getCallerInfo();
  
  let logMessage = `${timestamp} [${level}] ${fileName}:${lineNumber} - ${message}`;
  
  if (error) {
    if (error instanceof Error) {
      logMessage += `\nError: ${error.message}\nStack: ${error.stack}`;
    } else {
      logMessage += `\nError: ${JSON.stringify(error)}`;
    }
  }
  
  return logMessage;
};

const logger: Logger = {
  error(message: string, error?: any): void {
    console.error(formatLog('ERROR', message, error));
  },
  
  info(message: string, data?: any): void {
    let logMessage = formatLog('INFO', message);
    if (data) {
      logMessage += `\nData: ${JSON.stringify(data, null, 2)}`;
    }
    console.info(logMessage);
  },
  
  warn(message: string, data?: any): void {
    let logMessage = formatLog('WARN', message);
    if (data) {
      logMessage += `\nData: ${JSON.stringify(data, null, 2)}`;
    }
    console.warn(logMessage);
  },
  
  debug(message: string, data?: any): void {
    let logMessage = formatLog('DEBUG', message);
    if (data) {
      logMessage += `\nData: ${JSON.stringify(data, null, 2)}`;
    }
    console.debug(logMessage);
  }
};

export default logger;
