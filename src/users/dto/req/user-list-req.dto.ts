export class UserListRequestDto {
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: string;
}
