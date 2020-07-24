/**
 * @Auto: 王小祥
 * @Date: 2020/7/16
 * @Description: 信用模块-当日疫情服务-数据
 * @LastEditors: 王小祥
 * @LastEditTime: 2020/7/16
 */
export const oneList = {
	title: '季度红黑榜',
	header: [
		{
			name:'法人红名单',
			number:18,
			className:'redAnnouncedLegalPerson'
		},
		{
			name:'法人黑名单',
			number:14,
			className:'blackAnnouncedLegalPerson'
		},
		{
			name:'自然人黑名单',
			number:9,
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
			redAnnouncement:6,
			blackAnnouncement:2
		},
		{
			name:'银行',
			redAnnouncement:1,
			blackAnnouncement:1
		},
		{
			name:'文广局',
			redAnnouncement:2,
			blackAnnouncement:1
		},
		{
			name:'住建局',
			redAnnouncement:4,
			blackAnnouncement:''
		},
		{
			name:'农业农村局',
			redAnnouncement:1,
			blackAnnouncement:''
		},
		{
			name:'房地产管理局',
			redAnnouncement:2,
			blackAnnouncement:''
		},
		{
			name:'法院',
			redAnnouncement:'',
			blackAnnouncement:19
		}
	]
}
