type FormatDateOptions = Intl.DateTimeFormatOptions

export function utils() {
  /**
   * 천 단위 구분 기호(쉼표) 추가
   * @param num - 숫자 or 문자열
   * @returns
   */
  const addCommas = (num: string | number | undefined): string => {
    if (num === undefined) {
      return ''
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  /**
   * Date 객체를 문자열로 포맷팅
   * @param date - 포맷하고자 하는 Date 객체
   * @param options - 포맷 옵션, 기본값은 { year: 'numeric', month: 'long', day: 'numeric' }
   * @returns
   */
  const formatDate = (
    date: Date,
    options: FormatDateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  ): string => {
    return date.toLocaleDateString(undefined, options)
  }

  return {
    addCommas,
    formatDate
  }
}
