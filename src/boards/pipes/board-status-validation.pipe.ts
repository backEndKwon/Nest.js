import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status-enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOPtions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('value', value);
    // console.log('metadata', metadata);
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
        throw new BadRequestException(`입력하신 ${value}은(는) status 옵션이 아닙니다.`)
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOPtions.indexOf(status);
    return index !== -1;
  }
}