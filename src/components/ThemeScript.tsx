export default function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('gyun-dev-theme');
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var finalTheme = theme || systemTheme;
        
        if (finalTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        // 로컬 스토리지 접근 실패 시 기본값 사용
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
