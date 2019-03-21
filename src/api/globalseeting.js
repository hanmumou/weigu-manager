import { post, GET, patch } from '@/utils/request'

export const getprovice = (type) => post('api/area', { type })

export const getCity = (type, data) => post('api/area', { type, data })

export const globalList = () => GET('api/foundation-setup')

export const globalupdata = (id, distribution_area, distribution_mode, forwarding_display, technical_support, affiliate_hotline, quality_merchandise_recommend,
  cash_withdrawal_amount, promotion_commission, distribution_fee, national_express_fee, motion_integral, rank_of_head_of_regiment, region_json) => patch('api/foundation-setup/' + id +
  '?distribution_area=' + distribution_area +
  '&distribution_mode=' + distribution_mode +
  '&forwarding_display=' + forwarding_display +
  '&technical_support=' + technical_support +
  '&affiliate_hotline=' + affiliate_hotline +
  '&quality_merchandise_recommend=' + quality_merchandise_recommend +
  '&cash_withdrawal_amount=' + cash_withdrawal_amount +
  '&promotion_commission=' + promotion_commission +
  '&distribution_fee=' + distribution_fee +
  '&national_express_fee=' + national_express_fee +
  '&motion_integral=' + motion_integral +
  '&rank_of_head_of_regiment=' + rank_of_head_of_regiment +
  '&region_json=' + region_json)
//区域配送   接口
export const globaladdArea = (distribution_area, distribution_mode, forwarding_display, technical_support, affiliate_hotline, quality_merchandise_recommend,
  cash_withdrawal_amount, promotion_commission, distribution_fee, national_express_fee, motion_integral, rank_of_head_of_regiment, region_json) => post('api/foundation-setup', { distribution_area, distribution_mode, forwarding_display, technical_support, affiliate_hotline, quality_merchandise_recommend,
  cash_withdrawal_amount, promotion_commission, distribution_fee, national_express_fee, motion_integral, rank_of_head_of_regiment, region_json })
//全国配送的接口
export const globaladdAll = (distribution_area, distribution_mode, forwarding_display, technical_support, affiliate_hotline, quality_merchandise_recommend,
  cash_withdrawal_amount, promotion_commission, distribution_fee, national_express_fee, motion_integral, rank_of_head_of_regiment) => post('api/foundation-setup', { distribution_area, distribution_mode, forwarding_display, technical_support, affiliate_hotline, quality_merchandise_recommend,
  cash_withdrawal_amount, promotion_commission, distribution_fee, national_express_fee, motion_integral, rank_of_head_of_regiment})