import React from 'react'
import PropTypes from 'prop-types'
export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes} className="light">
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                window.__onThemeChange = function() {}; // 컴포넌트에서 정의할 테마 변경 콜백

                var preferredTheme; // 초기화에 사용할 테마
                try {
                  var saved = localStorage.getItem('theme') // 로컬 스토리지에 있는 것 사용
                  if (saved) {
                    preferredTheme = saved.toLowerCase()
                  }
                } catch (err) { }

                // 테마 설정 함수
                window.__setPreferredTheme = function(newTheme) {
                  window.__theme = newTheme; // 테마는 전역 변수에 저장
                  preferredTheme = newTheme;
                  document.body.className = newTheme; // 바디에 클래스 추가
                  window.__onThemeChange(newTheme); // 콜백 실행

                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }

                // 컬러모드 미디어 쿼리 객체를 가져온다
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                // 컬러모드 변경 탐지 이벤트 리스터 추가
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                });

                // 테마 설정. 저장된 테마가 없으면 시스템 설정을 사용한다.
                window.__setPreferredTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
              })();
            `,
            }}
          />
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
