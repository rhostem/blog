import * as React from 'react'
import styled from 'styled-components'
import { media, colors } from '../styles'
import { ContentWrapper } from '../components/content-wrapper'
import SITE_CONFIG from '../../site-config'

const FooterWrap = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  padding: 1.5rem 0;
  background-color: #fff;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  line-height: 1.4;
  text-align: center;
`

const FooterContent = styled(ContentWrapper)`
  font-weight: 400;
  font-size: 0.7rem;
  ${media.OVER_MOBILE} {
    font-size: 0.75rem;
  }
`

const CopyRight = styled.div`
  margin: 0.5rem auto;
`

const OwnerLink = styled.a`
  margin: 0.5rem auto;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: underline;
`

const FooterLinks = styled.div`
  margin: 0.5rem auto;
  text-align: center;
  font-size: 1rem;

  ${media.OVER_MOBILE} {
    font-size: 1rem;
  }

  & > * {
    margin-left: 0.5em;
  }

  i {
    color: ${({ theme }) => theme.colors.text};
  }
`

const PoweredBy = styled.div`
  margin: 0.5rem auto;
  color: ${({ theme }) => theme.colors.text};

  & > p {
    font-weight: 400;
    margin: 0.8rem 0 0;
  }

  & a {
    text-decoration: underline;
  }

  img {
    height: 1.5rem;
    margin-bottom: 0;
  }
`

function Footer() {
  return (
    <FooterWrap>
      <FooterContent>
        <FooterLinks>
          <a href={SITE_CONFIG.githubUrl}>
            <i className="fab fa-github" />
          </a>
          <a href={`mailto:${SITE_CONFIG.authorEmail}`}>
            <i className="far fa-envelope" />
          </a>
          <a href={`${SITE_CONFIG.siteRss}`}>
            <i className="fas fa-rss" />
          </a>
        </FooterLinks>
        <CopyRight>
          <span>Copyright © </span>
          <OwnerLink href="https://www.github.com/rhostem">rhostem</OwnerLink>
          <span> All rights reserved</span>
        </CopyRight>
        <PoweredBy>
          <span>powered by&nbsp;</span>
          <a
            href="https://www.gatsbyjs.org/"
            target="_blank"
            rel="noopener noreferrer">
            Gatsby
          </a>
          <span>,&nbsp;</span>
          <a
            href="https://www.contentful.com/"
            target="_blank"
            rel="noopener noreferrer">
            Contentful
          </a>
          <span>,&nbsp;</span>
          <a
            href="https://circleci.com/"
            target="_blank"
            rel="noopener noreferrer">
            CircleCI
          </a>
        </PoweredBy>
      </FooterContent>
    </FooterWrap>
  )
}

export default Footer
