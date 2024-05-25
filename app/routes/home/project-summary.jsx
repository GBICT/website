import React, { Suspense, useState } from 'react';
import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Loader } from '~/components/loader';
import styles from './project-summary.module.css';

const Model = React.lazy(() => import('~/components/model').then(module => ({ default: module.Model })));

export function ProjectSummary({
                                 id,
                                 visible: sectionVisible,
                                 sectionRef,
                                 index,
                                 title,
                                 description,
                                 model,
                                 buttonText,
                                 buttonLink,
                                 alternate,
                                 ...rest
                               }) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const titleId = `${id}-title`;

  function handleModelLoad() {
    setModelLoaded(true);
    console.log('Model loaded');
  }

  function renderDetails(visible) {
    return (
      <div className={styles.details}>
        <div aria-hidden className={styles.index}>
          <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} collapseDelay={1000} />
          <span className={styles.indexNumber} data-visible={visible}>
            {index}
          </span>
        </div>
        <Heading level={3} as="h2" className={styles.title} data-visible={visible} id={titleId}>
          {title}
        </Heading>
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>
        <div className={styles.button} data-visible={visible}>
          <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  function renderPreview(visible) {
    return (
      <div className={styles.preview}>
        {model.type === 'laptop' && (
          <div className={styles.model} data-device="laptop">
            {!modelLoaded && <Loader center className={styles.loader} data-visible={visible} />}
            {visible && (
              <Suspense fallback={<Loader center className={styles.loader} data-visible={visible} />}>
                <Model
                  alt={model.alt}
                  cameraPosition={{ x: 0, y: 0, z: 8 }}
                  showDelay={700}
                  onLoad={handleModelLoad}
                  show={visible}
                  models={[
                    {
                      ...model,
                      texture: {
                        ...model.textures[0],
                        sizes: `(max-width: 768px) 80vw, 40vw`,
                      },
                    },
                  ]}
                />
              </Suspense>
            )}
          </div>
        )}
        {model.type === 'phone' && (
          <div className={styles.model} data-device="phone">
            {!modelLoaded && <Loader center className={styles.loader} data-visible={visible} />}
            {visible && (
              <Suspense fallback={<Loader center className={styles.loader} data-visible={visible} />}>
                <Model
                  alt={model.alt}
                  cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                  showDelay={300}
                  onLoad={handleModelLoad}
                  show={visible}
                  models={[
                    {
                      ...model,
                      position: { x: -0.6, y: 1.1, z: 0 },
                      texture: {
                        ...model.textures[0],
                        sizes: `(max-width: 768px) 30vw, 20vw`,
                      },
                    },
                    {
                      ...model,
                      position: { x: 0.6, y: -0.5, z: 0.3 },
                      texture: {
                        ...model.textures[1],
                        sizes: `(max-width: 768px) 30vw, 20vw`,
                      },
                    },
                  ]}
                />
              </Suspense>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        {renderDetails(sectionVisible)}
        {renderPreview(sectionVisible)}
      </div>
    </Section>
  );
}
