import css, { SerializedStyles } from '@emotion/css';

export const globalStyle = (): SerializedStyles => css`
  @-ms-viewport {
    width: device-width;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .disable-user-select {
    -webkit-touch-callout: none;
    user-select: none;
  }

  .burger-opened .icon-color {
    fill: #fff;
  }



  .pretty-scroll {
    ::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
`;
