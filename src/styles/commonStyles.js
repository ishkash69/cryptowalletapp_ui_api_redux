import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import colors from "./colors";
import fontFamily from "./fontFamily";
import { moderateScale, moderateScaleVertical, textScale } from "./responsiveSize";

const commonStyles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowAlignCen: { flexDirection: "row", alignItems: "center" },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowSpaceBetweenCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowCenterCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  centerCenter: {
    justifyContent: "center",
    alignItems: "center",
  },

  topSpacing: {
    marginTop: getStatusBarHeight(true) + moderateScale(10),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },

  //bold spaceGro
  spaceBold10Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(10),
    color: colors.black,
  },
  spaceBold12Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(12),
    color: colors.black,
  },
  spaceBold14Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(14),
    color: colors.black,
  },
  spaceBold16Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(16),
    color: colors.black,
  },
  spaceBold18Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(18),
    color: colors.black,
  },
  spaceBold20Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(20),
    color: colors.black,
  },
  spaceBold24Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(23),
    color: colors.black,
  },
  spaceBold24Black: {
    fontFamily: fontFamily.spaceGroteskBold,
    fontSize: textScale(24),
    color: colors.black,
  },

  //semiBold spaceGro
  spaceSemiBold12Black: {
    fontFamily: fontFamily.spaceGroteskSemiBold,
    fontSize: textScale(12),
    color: colors.black,
  },
  spaceSemiBold14Black: {
    fontFamily: fontFamily.spaceGroteskSemiBold,
    fontSize: textScale(14),
    color: colors.black,
  },
  spaceSemiBold16Black: {
    fontFamily: fontFamily.spaceGroteskSemiBold,
    fontSize: textScale(16),
    color: colors.black,
  },
  spaceSemiBold18Black: {
    fontFamily: fontFamily.spaceGroteskSemiBold,
    fontSize: textScale(18),
    color: colors.black,
  },
  spaceSemiBold18Black:{
    fontFamily: fontFamily.spaceGroteskSemiBold,
    fontSize: textScale(20),
    color: colors.black,
  },
  spaceSemiBold24Black: {
    fontFamily: fontFamily.spaceGroteskSemiBold,
    fontSize: textScale(24),
    color: colors.black,
  },

  //medium spaceGro
  spaceMedium10Black: {
    fontFamily: fontFamily.spaceGroteskMedium,
    fontSize: textScale(10),
    color: colors.black,
  },
  spaceMedium12Black: {
    fontFamily: fontFamily.spaceGroteskMedium,
    fontSize: textScale(12),
    color: colors.black,
  },
  spaceMedium14Black: {
    fontFamily: fontFamily.spaceGroteskMedium,
    fontSize: textScale(14),
    color: colors.black,
  },
  spaceMedium16Black: {
    fontFamily: fontFamily.spaceGroteskMedium,
    fontSize: textScale(16),
    color: colors.black,
  },
  spaceMedium18Black: {
    fontFamily: fontFamily.spaceGroteskMedium,
    fontSize: textScale(18),
    color: colors.black,
  },
  spaceMedium24Black: {
    fontFamily: fontFamily.spaceGroteskMedium,
    fontSize: textScale(24),
    color: colors.black,
  },

  //regular spaceGro
  spaceRegular12Black: {
    fontFamily: fontFamily.spaceGroteskRegular,
    fontSize: textScale(12),
    color: colors.black,
  },
  spaceRegular14Black: {
    fontFamily: fontFamily.spaceGroteskRegular,
    fontSize: textScale(14),
    color: colors.black,
  },
  spaceRegular16Black: {
    fontFamily: fontFamily.spaceGroteskRegular,
    fontSize: textScale(16),
    color: colors.black,
  },
  spaceRegular18Black: {
    fontFamily: fontFamily.spaceGroteskRegular,
    fontSize: textScale(18),
    color: colors.black,
  },
  spaceRegular24Black: {
    fontFamily: fontFamily.spaceGroteskRegular,
    fontSize: textScale(24),
    color: colors.black,
  },

  //regular DM Sans
  dmSansRegular12Black: {
    fontFamily: fontFamily.DMSansRegular,
    fontSize: textScale(12),
    color: colors.black,
  },
  dmSansRegular14Black: {
    fontFamily: fontFamily.DMSansRegular,
    fontSize: textScale(14),
    color: colors.black,
  },
  dmSansRegular15Black: {
    fontFamily: fontFamily.DMSansRegular,
    fontSize: textScale(15),
    color: colors.black,
  },
  dmSansRegular16Black: {
    fontFamily: fontFamily.DMSansRegular,
    fontSize: textScale(16),
    color: colors.black,
  },
  dmSansRegular18Black: {
    fontFamily: fontFamily.DMSansRegular,
    fontSize: textScale(18),
    color: colors.black,
  },

  //medium DM Sans
  dmSansMedium10Black: {
    fontFamily: fontFamily.DMSansMedium,
    fontSize: textScale(10),
    color: colors.black,
  },
  dmSansMedium12Black: {
    fontFamily: fontFamily.DMSansMedium,
    fontSize: textScale(12),
    color: colors.black,
  },
  dmSansMedium14Black: {
    fontFamily: fontFamily.DMSansMedium,
    fontSize: textScale(14),
    color: colors.black,
  },
  dmSansMedium15Black: {
    fontFamily: fontFamily.DMSansMedium,
    fontSize: textScale(15),
    color: colors.black,
  },
  dmSansMedium16Black: {
    fontFamily: fontFamily.DMSansMedium,
    fontSize: textScale(16),
    color: colors.black,
  },
  dmSansMedium18Black: {
    fontFamily: fontFamily.DMSansMedium,
    fontSize: textScale(18),
    color: colors.black,
  },
  dmSansMedium20Black: {
    fontFamily: fontFamily.DMSansMedium,
    fontSize: textScale(20),
    color: colors.black,
  },

  //bold DM Sans
  dmSansBold12Black: {
    fontFamily: fontFamily.DMSansBold,
    fontSize: textScale(12),
    color: colors.black,
  },
  dmSansBold14Black: {
    fontFamily: fontFamily.DMSansBold,
    fontSize: textScale(14),
    color: colors.black,
  },
  dmSansBold16Black: {
    fontFamily: fontFamily.DMSansBold,
    fontSize: textScale(16),
    color: colors.black,
  },
  dmSansBold18Black: {
    fontFamily: fontFamily.DMSansBold,
    fontSize: textScale(18),
    color: colors.black,
  },

  fullWidthButtonContainer: {
    paddingVertical: moderateScaleVertical(11),
    borderRadius: moderateScale(8),
    backgroundColor: colors.redText,
    marginVertical: moderateScaleVertical(12)
  },

  commonView: {
    paddingHorizontal: moderateScale(24),
    backgroundColor: colors.black,
    paddingVertical: moderateScaleVertical(40)
  },
  commonTextInput: {
    flex:1,
    paddingHorizontal: moderateScale(10),
    fontSize: textScale(16),
    fontFamily: fontFamily.spaceGroteskMedium,
    color: colors.white
  },
  commonViewPadding40: {
    backgroundColor: colors.black,
    padding: moderateScale(40),
    marginTop: moderateScale(40)
  },
  commonButton: {
    paddingVertical: moderateScaleVertical(6),
    paddingHorizontal: moderateScale(8),
    marginTop: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.redText,
  },
  commonViewPaddingBottom21: {
    backgroundColor: colors.black,
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(21)
  },
  commonPaddingTop10: {
    backgroundColor: colors.black,
    paddingTop: moderateScale(10),
    paddingHorizontal: moderateScale(24),
    paddingBottom: moderateScale(21)
  },
  commonButtonPadding10: {
    padding: moderateScale(10),
    backgroundColor: colors.redText,
    borderRadius: moderateScale(8),
  },
  commonButtonBgBlack: {
    backgroundColor: colors.black,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScaleVertical(6),
    borderRadius: moderateScale(4),
    marginTop: moderateScale(16),
    alignSelf: 'flex-start'
  },
  commonViewMarginTop8RowCenter: {
    marginTop: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  commonViewPaddingvertical40: {
    backgroundColor: colors.black,
    paddingVertical: moderateScale(40)
  },
  topSpacingPadding: {
    paddingTop: getStatusBarHeight(true) + moderateScale(15),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  shadowRightBottom:{
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 2, height: 2 },
    borderRadius: moderateScale(4),
    shadowOpacity: 1,
    elevation: moderateScale(20),
    backgroundColor:colors.white,

  }
});

export default commonStyles;
