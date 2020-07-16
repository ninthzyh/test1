/**
 * @Auto: 王小祥
 * @Date: 2020/7/16
 * @Description: 信用模块-当日疫情服务-数据
 * @LastEditors: 王小祥
 * @LastEditTime: 2020/7/16
 */
export const oneList = {
	title: '当日疫情服务',
	header: [
		{
			name:'法人红名单',
			number:18,
			className:'redAnnouncedLegalPerson'
		},
		{
			name:'法人黑名单',
			number:18,
			className:'blackAnnouncedLegalPerson'
		},
		{
			name:'自然人黑名单',
			number:18,
			className:'blackAnnouncedPerson'
		}
	],
	option: [
		{
			name:'税务局',
			redAnnouncement:2,
			blackAnnouncement:1
		},
		{
			name:'市场监管局',
			redAnnouncement:2,
			blackAnnouncement:1
		},
		{
			name:'房地产管理局',
			redAnnouncement:2,
			blackAnnouncement:1
		}
	]
}
