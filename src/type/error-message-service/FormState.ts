export interface getErrorMessageListParams {
  Sorting: string,
  SkipCount: number,
  MaxResultCount: number,
}

export interface ErrorMessageFormParams {
  id: number | null,
  "errorCode": string,
  "alarmContent": string,
  "alarmContent_CH": string,
  "errorType": number | string
}