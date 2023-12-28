export class SuccessResponse<T> {
  constructor(
    public success: true,
    public status: number,
    public message: string,
    public data: T,
  ) {}
}
