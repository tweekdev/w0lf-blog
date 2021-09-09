import { css } from '@emotion/core';
import React from 'react';

export const Details: React.FC<{
  title: string;
  stack: string[];
  workXp: number | null;
  newConnectionCount: number;
  newMatchesCount: number;
  newInterestedCount: number;
  strength: number;
}> = ({
  title,
  stack,
  workXp,
  newConnectionCount,
  newMatchesCount,
  newInterestedCount,
  strength,
}) => {
  return (
    <>
      <div
        className='header-details'
        style={css`
                    background: 
                    background-blend-mode: multiply;
                    :hover {
                        background: inherit;
                    }
                    height: 3.5rem;
                    text-align: center;
                    width: 100%;
                    padding: 0 16px;
                    p {
                        margin: 0;
                        color: white;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        width: 100%;
                    }s
                `}
      >
        <p
          style={css`
            line-height: 1.5rem;
            font-weight: 500;
            text-transform: uppercase;
            white-space: nowrap;
            text-overflow: ellipsis;
          `}
        >
          dwe
        </p>
        <p
          style={css`
            font-size: 0.75rem;

            line-height: 1rem;

            white-space: nowrap;

            text-overflow: ellipsis;
          `}
        >
          {stack.join(' / ')}
        </p>
      </div>

      <div
        className='header-details'
        style={css`
          border-radius: 0 0 16px 16px;

          height: 11rem;
        `}
      >
        <div
          style={css`
            height: 11rem;
          `}
        >
          <div
            style={css`
              border-radius: 4px;

              width: 16rem;

              margin: 0.25rem 1rem;

              height: 1.25rem;

              display: flex;

              justify-content: space-around;

              align-items: center;

              small {
                font-weight: 500;

                text-align: center;
              }
            `}
          >
            <small>dqwdqw</small>

            <small>dwqd</small>
          </div>

          <div
            className='details'
            style={css`
              margin: 0.25rem 1.5rem;

              p {
                white-space: nowrap;

                overflow: hidden;

                text-overflow: ellipsis;
              }
            `}
          >
            <div
              style={css`
                display: flex;

                align-items: center;
              `}
            >
              <div
                style={css`
                  width: 32px;

                  height: 32px;

                  display: flex;

                  justify-content: center;

                  align-items: center;

                  border-radius: 50%;
                `}
              >
                <p>{newConnectionCount}</p>
              </div>

              <p className='col-9'>dwedw</p>
            </div>

            <div
              style={css`
                display: flex;

                align-items: center;
              `}
            >
              <div
                style={css`
                  width: 32px;

                  height: 32px;

                  display: flex;

                  justify-content: center;

                  align-items: center;

                  border-radius: 50%;
                `}
              >
                <p>{newInterestedCount}</p>
              </div>

              <p className='col-9'>fdqwd</p>
            </div>

            <div
              style={css`
                display: flex;

                align-items: center;
              `}
            >
              <div
                style={css`
                  width: 32px;

                  height: 32px;

                  display: flex;

                  justify-content: center;

                  align-items: center;

                  border-radius: 50%;
                `}
              >
                <p>{newMatchesCount}</p>
              </div>

              <p className='col-9'>dwqdq</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
