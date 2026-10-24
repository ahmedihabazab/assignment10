export function ConflictException({
  errMsg = "Confilct",
  cause = { statusCode: 409 },
}) {
  throw new Error(errMsg, { cause });
}

export function NotFoundException({
  errMsg = "not found",
  cause = { statusCode: 404 },
}) {
  throw new Error(errMsg, { cause });
}

export function BadRequestException({
  errMsg = "not found",
  cause = {},
  statusCode = 400,
}) {
  throw new Error(errMsg, { cause: { statusCode, ...cause } });
}

export function UnAuthorizeException({
  errMsg = "UnAthorize",
  cause = { statusCode: 401 },
}) {
  throw new Error(errMsg, { cause });
}
