import { ValidationError } from "@nestjs/common";
import * as moment from "moment-timezone";
import { customAlphabet } from "nanoid";

export class UtilCommonTemplate {
  static getMessageValidator(errors: ValidationError[]) {
    return errors
      .map((item) => {
        return Object.keys(item.constraints)
          .map((obj) => item.constraints[obj])
          .join(',');
      })
      .join(',');
  }

  static getDate(value: Date): Date {
    return moment(value).utc(true).toDate()
  }

  static generateId() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const generateId = customAlphabet(alphabet, 15);

    // Tạo ra một chuỗi ID mới
    return generateId();
  }
}