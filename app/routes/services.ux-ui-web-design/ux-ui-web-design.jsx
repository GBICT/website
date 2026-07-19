import backgroundSprLarge from '~/assets/spr-background-large.jpg';
import backgroundSprPlaceholder from '~/assets/spr-background-placeholder.jpg';
import backgroundSpr from '~/assets/spr-background.jpg';
import imageSprLessonBuilderDarkLarge from '~/assets/spr-lesson-builder-dark-large.jpg';
import imageSprLessonBuilderDarkPlaceholder from '~/assets/spr-lesson-builder-dark-placeholder.jpg';
import imageSprLessonBuilderDark from '~/assets/spr-lesson-builder-dark.jpg';
import imageSprLessonBuilderLightLarge from '~/assets/spr-lesson-builder-light-large.jpg';
import imageSprLessonBuilderLightPlaceholder from '~/assets/spr-lesson-builder-light-placeholder.jpg';
import imageSprLessonBuilderLight from '~/assets/spr-lesson-builder-light.jpg';
import imageSprComponentsDarkLarge from '~/assets/spr-components-dark-large.png';
import imageSprComponentsDarkPlaceholder from '~/assets/spr-components-dark-placeholder.png';
import imageSprComponentsDark from '~/assets/spr-components-dark.png';
import imageSprComponentsLightLarge from '~/assets/spr-components-light-large.png';
import imageSprComponentsLightPlaceholder from '~/assets/spr-components-light-placeholder.png';
import imageSprComponentsLight from '~/assets/spr-components-light.png';
import imageSprDesignSystemDarkLarge from '~/assets/spr-design-system-dark-large.png';
import imageSprDesignSystemDarkPlaceholder from '~/assets/spr-design-system-dark-placeholder.png';
import imageSprDesignSystemDark from '~/assets/spr-design-system-dark.png';
import imageSprDesignSystemLightLarge from '~/assets/spr-design-system-light-large.png';
import imageSprDesignSystemLightPlaceholder from '~/assets/spr-design-system-light-placeholder.png';
import imageSprDesignSystemLight from '~/assets/spr-design-system-light.png';
import videoSprMotionLarge from '~/assets/spr-motion-large.mp4';
import videoSprMotionPlaceholder from '~/assets/spr-motion-placeholder.jpg';
import videoSprMotion from '~/assets/spr-motion.mp4';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { useTheme } from '~/components/theme-provider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { media } from '~/utils/style';
import { useLocale, useUi } from '~/i18n';
import styles from './ux-ui-web-design.module.css';

const copy = {
  en: {
    title: 'UX/UI & web design',
    description:
      'We design and build the layer your customers actually touch. These are interfaces and websites that are intuitive, fast and a pleasure to use, from the first prototype to a polished, responsive product.',
    roles: ['UX & UI design', 'Web development', 'Design systems', 'Motion & 3D'],
    h1: 'Design that starts with your users',
    t1: 'Great design is not decoration. It decides whether people actually use what we build. We start from your users and their needs, and validate the experience with interactive prototypes before a line of production code is written.',
    darkTheme: 'Dark theme',
    lightTheme: 'Light theme',
    h2: 'A design system, not just screens',
    t2: 'Every screen is built from one consistent system of colours, typography, components and states. Switch the theme and the whole interface adapts, because it is designed as a system, not a set of individual pages.',
    h3: 'Documented and consistent',
    t3: 'We document the system, including principles, accessibility and component guidelines, so designers and engineers stay in sync and the product stays coherent as it grows.',
    h4: 'Motion that guides',
    t4: 'Subtle, purposeful animation guides people through the product and makes interactions feel effortless. It is never movement for its own sake.',
    h5: 'Curious what this looks like for you?',
    ctaPre: 'It starts with a conversation and an analysis, with no obligation. ',
    ctaMid: ' or ',
    exploreAll: 'explore all services',
    alt1: 'A clean, intuitive application interface designed by GBICT.',
    alt2: 'A set of interface components.',
    alt3: 'Documentation for a design system, linking principles and components.',
    alt4: 'Fluid motion guiding a user through an interface.',
  },
  nl: {
    title: 'UX/UI & webdesign',
    description:
      'We ontwerpen en bouwen de laag die je klanten echt aanraken. Interfaces en websites die intuïtief, snel en prettig in gebruik zijn, van het eerste prototype tot een strak, responsive product.',
    roles: ['UX & UI design', 'Webdevelopment', 'Designsystemen', 'Beweging & 3D'],
    h1: 'Design dat begint bij je gebruikers',
    t1: 'Goed design is geen versiering. Het bepaalt of mensen echt gebruiken wat we bouwen. We vertrekken vanuit je gebruikers en hun behoeften, en valideren de ervaring met interactieve prototypes voordat er een regel productiecode geschreven wordt.',
    darkTheme: 'Donker thema',
    lightTheme: 'Licht thema',
    h2: 'Een designsysteem, niet losse schermen',
    t2: 'Elk scherm is gebouwd vanuit één consistent systeem van kleuren, typografie, componenten en states. Wissel het thema en de hele interface past zich aan, omdat het als systeem is ontworpen, niet als een set losse pagina’s.',
    h3: 'Gedocumenteerd en consistent',
    t3: 'We documenteren het systeem, inclusief principes, toegankelijkheid en componentrichtlijnen, zodat designers en developers op één lijn blijven en het product samenhangend blijft terwijl het groeit.',
    h4: 'Beweging die leidt',
    t4: 'Subtiele, doelgerichte animatie leidt mensen door het product en laat interacties moeiteloos voelen. Nooit beweging om de beweging.',
    h5: 'Benieuwd hoe dit er voor jou uitziet?',
    ctaPre: 'Het begint met een gesprek en een analyse, vrijblijvend. ',
    ctaMid: ' of ',
    exploreAll: 'bekijk alle diensten',
    alt1: 'Een strakke, intuïtieve applicatie-interface ontworpen door GBICT.',
    alt2: 'Een set interfacecomponenten.',
    alt3: 'Documentatie voor een designsysteem, dat principes en componenten verbindt.',
    alt4: 'Vloeiende beweging die een gebruiker door een interface leidt.',
  },
};

export const meta = () => {
  return baseMeta({ title: copy.nl.title, description: copy.nl.description, prefix: 'Services' });
};

export const UxUiWebDesign = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themes = ['dark', 'light'];
  const c = copy[useLocale()];
  const ui = useUi();

  const handleThemeChange = index => {
    toggleTheme(themes[index]);
  };

  return (
    <>
      <ProjectContainer>
        <ProjectBackground
          opacity={isDark ? 0.5 : 0.8}
          src={backgroundSpr}
          srcSet={`${backgroundSpr} 1080w, ${backgroundSprLarge} 2160w`}
          placeholder={backgroundSprPlaceholder}
        />
        <ProjectHeader title={c.title} description={c.description} roles={c.roles} />

        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprLessonBuilderDark} 1280w, ${imageSprLessonBuilderDarkLarge} 2560w`
                  : `${imageSprLessonBuilderLight} 1280w, ${imageSprLessonBuilderLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprLessonBuilderDarkPlaceholder
                  : imageSprLessonBuilderLightPlaceholder
              }
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt={c.alt1}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>{c.h1}</ProjectSectionHeading>
            <ProjectSectionText>{c.t1}</ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>

        <ProjectSection light={isDark}>
          <ProjectSectionContent>
            <Image
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprComponentsDark} 1024w, ${imageSprComponentsDarkLarge} 2048w`
                  : `${imageSprComponentsLight} 1024w, ${imageSprComponentsLightLarge} 2048w`
              }
              width={1024}
              height={800}
              placeholder={
                isDark
                  ? imageSprComponentsDarkPlaceholder
                  : imageSprComponentsLightPlaceholder
              }
              alt={c.alt2}
              sizes="100vw"
            />
            <ProjectTextRow>
              <SegmentedControl
                currentIndex={themes.indexOf(theme)}
                onChange={handleThemeChange}
              >
                <SegmentedControlOption>{c.darkTheme}</SegmentedControlOption>
                <SegmentedControlOption>{c.lightTheme}</SegmentedControlOption>
              </SegmentedControl>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>{c.h2}</ProjectSectionHeading>
              <ProjectSectionText>{c.t2}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <Image
              raised
              key={theme}
              srcSet={
                isDark
                  ? `${imageSprDesignSystemDark} 1280w, ${imageSprDesignSystemDarkLarge} 2560w`
                  : `${imageSprDesignSystemLight} 1280w, ${imageSprDesignSystemLightLarge} 2560w`
              }
              width={1280}
              height={800}
              placeholder={
                isDark
                  ? imageSprDesignSystemDarkPlaceholder
                  : imageSprDesignSystemLightPlaceholder
              }
              alt={c.alt3}
              sizes="100vw"
            />
            <ProjectTextRow>
              <ProjectSectionHeading>{c.h3}</ProjectSectionHeading>
              <ProjectSectionText>{c.t3}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns>
            <ProjectSectionContent>
              <ProjectTextRow width="s">
                <ProjectSectionHeading>{c.h4}</ProjectSectionHeading>
                <ProjectSectionText>{c.t4}</ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
            <Image
              raised
              className={styles.video}
              srcSet={`${videoSprMotion} 1280w, ${videoSprMotionLarge} 2560w`}
              width={1280}
              height={800}
              placeholder={videoSprMotionPlaceholder}
              alt={c.alt4}
              sizes={`(max-width: ${media.mobile}px) 100vw, 50vw`}
            />
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>{c.h5}</ProjectSectionHeading>
              <ProjectSectionText>
                {c.ctaPre}
                <Link href="/contact">{ui.common.discuss}</Link>
                {c.ctaMid}
                <Link href="/services">{c.exploreAll}</Link>.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
