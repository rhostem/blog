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
  border-top: 1px solid ${colors.border};
  line-height: 1.4;
  text-align: center;
`

const FooterContent = styled(ContentWrapper)`
  font-weight: 400;
  font-size: 0.7rem;
  @media ${media.largetThanMobile} {
    font-size: 0.75rem;
  }
`

const CopyRight = styled.div``

const OwnerLink = styled.a`
  color: ${colors.text};
  text-decoration: underline;
`

const FooterLinks = styled.div`
  text-align: center;
  font-size: 1rem;
  margin-top: 0.5rem;

  @media ${media.largerThanMobile} {
    font-size: 0.85rem;
  }

  & > * {
    margin-left: 0.5em;
  }

  i {
    color: ${colors.text};
  }
`

const PoweredBy = styled.div`
  margin: 0 auto;
  margin-top: 1rem;

  & > p {
    font-weight: bold;
    margin: 0.8rem 0 0;
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
        <CopyRight>
          <span>Copyright © 2018. </span>
          <OwnerLink href="https://www.github.com/rhostem">rhostem</OwnerLink>
          <span> All rights reserved</span>
        </CopyRight>
        <FooterLinks>
          <a href={SITE_CONFIG.githubUrl}>
            <i className="fa fa-github" />
          </a>
          <a href={`mailto:${SITE_CONFIG.authorEmail}`}>
            <i className="fa fa-envelope-o" />
          </a>
          <a href={`${SITE_CONFIG.siteRss}`}>
            <i className="fa fa-rss" />
          </a>
        </FooterLinks>
        <PoweredBy>
          <p>powered by</p>
          <a
            href="https://www.gatsbyjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/image/gatsby-logo.svg" alt="" />
          </a>
        </PoweredBy>
      </FooterContent>
    </FooterWrap>
  )
}

export default Footer
