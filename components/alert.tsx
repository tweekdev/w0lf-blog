import Container from './container';
import { EXAMPLE_PATH } from '../lib/constants';
import styles from './Alert.module.css';

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div className={styles.alert}>
      <Container>
        <div className='py-2 text-center text-sm'>
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href='/api/exit-preview'
                className='underline hover:text-cyan duration-200 transition-colors'
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <>
              The source code for this blog is{' '}
              <a
                href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
                className='underline hover:text-success duration-200 transition-colors'
              >
                available on GitHub
              </a>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Alert;
