import './index.scss'
import changeNav from '@/components/topBar/index'
// import { setLang } from '@/utils/i18n'
const dom = {
  text_box_new: $('#index .home .text-box_new'),
  home_span: $('#index .home > div > span'),
  about_div: $('#index .about > div'),
  services_content: $('#index .services .services-content'),
  impact_content: $('#index .impact .impact-content'),
}
dom.home_span.on('click', () => {
  changeNav('about')
})