<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__inner">
        <div class="header__logo">
          <!--        TODO: add root link-->
          <a href="/">
            <vuestic-logo height="30" width="150" />
          </a>
          <div class="menu" @click="onClick(!isHidden)" :style="{position: !isHidden ? 'fixed' : 'absolute'}">
            <img v-if="!isHidden" src="../../assets/landing/images/hamburger.svg" alt="menu">
            <img v-else src="../../assets/landing/images/cross.svg" alt="menu">
          </div>
        </div>
        <nav class="header__links">
          <!-- vuestic buttons -->
          <va-button :to="`/${$root.$i18n.locale}/introduction/overview`" class="header__links--link" flat color="black">{{ $t('landing.header.buttons.overview') }}</va-button>
          <va-button :to="`/${$root.$i18n.locale}/introduction/overview`" class="header__links--link" flat color="primary">{{ $t('landing.header.buttons.docs') }}</va-button>
          <va-button href="https://discord.gg/u7fQdqQt8c" target="blank" class="header__links--link" flat color="primary">{{ $t('landing.header.buttons.discord') }}</va-button>
          <LanguageDropdown />
          <stars-button class="ml-2" repo="epicmaxco/vuestic-ui" />
        </nav>
        <!-- mobile -->
        <nav class="mobile-menu" :class="computedClass">
          <va-list>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <router-link :to="`/${$root.$i18n.locale}/introduction/overview`">{{ $t('landing.header.buttons.overview') }}</router-link>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <router-link :to="`/${$root.$i18n.locale}/introduction/overview`">{{ $t('landing.header.buttons.docs') }}</router-link>
              </va-list-item-section>
            </va-list-item>
            <va-list-item>
              <va-list-item-section class="mobile-menu__link">
                <a href="https://discord.gg/u7fQdqQt8c" target="_blank">{{ $t('landing.header.buttons.discord') }}</a>
              </va-list-item-section>
            </va-list-item>
            <va-list-label color="#757B83" class="mobile-menu__label">
              {{ $t('landing.header.buttons.language') }}
            </va-list-label>
            <div class="mobile-menu__languages">
              <va-list-item
                v-for="(option, id) in options"
                :key="id"
                class="mobile-menu__language"
                :class="{ active: option.code === currentLanguage }"
                @click="setLanguage(option.code)"
              >
                <va-list-item-section class="mobile-menu__link">
                  <span class="language">{{ option.name }}</span>
                </va-list-item-section>
              </va-list-item>
              <va-list-item>
                <va-list-item-section class="mobile-menu__link">
                  <router-link
                    class="mobile-menu__language"
                    :to="`/${$root.$i18n.locale}/contribution/translation`"
                  >
                    {{ $t('landing.header.buttons.translation') }}
                  </router-link>
                </va-list-item-section>
              </va-list-item>
            </div>

            <div class="star-button-wrapper">
              <stars-button repo="epicmaxco/vuestic-admin" />
            </div>
          </va-list>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
// @ts-nocheck
import { Options, Vue } from 'vue-class-component'
import { languages } from '../../locales'
import VuesticLogo from '../header/components/VuesticLogo.vue'
import LanguageDropdown from '../header/components/LanguageDropdown.vue'
import StarsButton from './StarsButton.vue'

@Options({
  name: 'LandingHeader',
  components: {
    LanguageDropdown, StarsButton, VuesticLogo,
  },
})
export default class Header extends Vue {
  value = false
  isHidden = true
  options = languages

  onClick (value: boolean) {
    this.isHidden = value
  }

  get computedClass () {
    return {
      'mobile-menu--open': !this.isHidden,
    }
  }

  setLanguage (locale: any) {
    this.$root.$i18n.locale = locale
    document.querySelector('html').setAttribute('lang', locale)
    localStorage.setItem('VueAppLanguage', locale)
    this.$nextTick(() => {
      // a little hack to change the same route alias
      const path = this.$localizePath(this.$route.fullPath, locale)
      this.$router.replace({
        path,
        hash: `#${+new Date()}`,
      }).then(() => this.$router.replace({ hash: '' }))
    })
  }

  get currentLanguage () {
    return (this as any).$root.$i18n.locale
  }

  get currentLanguageName () {
    const result = (this as any).options.find(({ code }: any) => code === this.currentLanguage)
    return result.name
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/main.scss";

.header {
  z-index: 2000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;

  &__wrapper {
    @include wrapper();
  }

  &__inner {
    @include row-flex();

    position: relative;
    align-items: center;
    height: 4.5rem;
  }

  &__logo {
    @include col();
    @include size(3);
    @include size-sm(12);

    display: flex;
    justify-content: space-between;
  }

  &__links {
    @include col();
    @include size(9);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    @include sm(display, none);

    &--link {
      @include link-font();

      line-height: 1.5rem;
      margin-left: 0.5rem;

      @include sm(width, 100%);
    }

    &--dropdown {
      @include sm(width, 100%);
    }
  }
}

.menu {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  z-index: 1000;
  display: none;
  cursor: pointer;

  @include sm(display, block);

  img {
    display: block;
  }
}

.language-dropdown {
  cursor: pointer;
  // TODO: fix dropdown
  max-height: 36px; // temporary solution

  @include sm(width, 100%);

  &__content {
    background-color: #f6f8f9;
    border-radius: 0.5rem;
    // min-width: 12rem;
    padding: 0.5rem 0;
  }

  &__item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    flex-wrap: nowrap;
    color: green;

    &:hover,
    &.active {
      .dropdown-item__text {
        color: #1b1a1f;
      }
    }
  }

  .dropdown-item__text {
    color: #2550c0;
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}

.mobile-menu {
  display: none;

  @include col();
  @include size-sm(12);
  @include sm(margin, 0);
  @include sm(width, 100%);
  @include sm(height, 100vh);
  @include sm(flex-direction, column);
  @include sm(justify-content, center);
  @include sm(background-color, #fff);
  @include sm(padding, 1rem 0);
  @include sm(position, fixed);
  @include sm(top, 0);
  @include sm(left, 0);

  &--open {
    @include sm(display, flex);
  }

  &__languages {
    overflow: auto;
    height: 35vh;
  }

  &__language {
    &.active {
      .language {
        color: #1b1a1f;
      }
    }
  }

  &__label {
    font-size: 10px;
    padding-top: 3rem;
    padding-bottom: 0.5rem;
  }

  &__link {
    @include link-font();

    text-align: center;

    span,
    a {
      color: #2550c0;
      padding: 0.5rem 0;

      &:hover {
        color: #1b1a1f;
      }
    }
  }
}

.star-button-wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
}

.star-button {
  @include code-font();

  min-height: 1.8rem;
  padding: 0 !important;

  &--desktop {
    margin-left: 0.5rem;
  }
}
</style>
