import { HttpStatus } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { ExceptionResponse } from "./exception";

export function IsEmail(validationOptions?: ValidationOptions) {
    return (object: unknown, propertyName: string) => {
        registerDecorator({
            name: 'isEmail',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate: (value: any): boolean => {
                    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
                    return emailRegex.test(value);
                },
                defaultMessage: (validationArguments?: ValidationArguments): string => {
                    throw new ExceptionResponse(
                        HttpStatus.BAD_REQUEST,
                        `Trường [${validationArguments.property}] không hợp lệ!`,
                    );
                },
            },
        });
    };
}