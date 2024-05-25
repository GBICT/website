import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { Button } from '~/components/button';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { cssProps, media } from '~/utils/style';
import styles from './project-summary.module.css';
import { useWindowSize } from '~/hooks';

const Model = lazy(() =>
  import('~/components/model').then(module => ({ default: module.Model }))
);

export function ProjectSummary({
                                 id,
                                 sectionRef,
                                 title,
                                 description,
                                 model,
                                 buttonText,
                                 buttonLink,
                                 alternate,
                                 visible: sectionVisible,
                               }) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= media.tablet;
  const uniqueKey = `${model.type}-${model.alt}`;

  useEffect(() => {
    console.log('ProjectSummary mounted', { id, title, model });
  }, [id, title, model]);

  useEffect(() => {
    if (!model.textures[0].srcSet || !model.textures[0].placeholder) {
      console.error("Model textures are not properly loaded", model);
    }
  }, [model]);

  function handleModelLoad() {
    console.log('Model loaded successfully');
    setModelLoaded(true);
  }

  function renderModel() {
    return (
      <div>
        {!modelLoaded && <p>Loading...</p>}
        <Suspense fallback={<p>Loading model...</p>}>
          <Model
            key={uniqueKey} // Ensure unique key for rerender
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: 8 }}
            show={sectionVisible}
            onLoad={handleModelLoad}
            models={[
              {
                ...model,
                texture: model.textures[0],
                style: { width: '50%', maxWidth: '400px', height: 'auto' } // Adjust size here
              },
            ]}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      onFocus={() => console.log('Section focused')}
      onBlur={() => console.log('Section blurred')}
      as="section"
      aria-labelledby={id}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <Heading level={3} as="h2" className={styles.title}>
            {title}
          </Heading>
          <Text as="p" className={styles.description}>
            {description}
          </Text>
          <Button href={buttonLink} className={styles.button}>
            {buttonText}
          </Button>
        </header>
        <div className={styles.preview}>
          {model.type === 'laptop' && renderModel()}
          {model.type === 'phone' && renderModel()}
        </div>
      </div>
    </Section>
  );
}
