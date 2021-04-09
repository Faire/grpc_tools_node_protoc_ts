import {EnumDescriptorProto} from "google-protobuf/google/protobuf/descriptor_pb";

export namespace EnumFormatter {

    export interface IEnumModel {
        indent: string;
        enumName: string;
        values: { [key: string]: number | string };
    }

    export function format(enumDescriptor: EnumDescriptorProto, indent: string, webApiCompatible?: boolean): IEnumModel {
        const enumName = `${enumDescriptor.getName()}${webApiCompatible ? "WebApiCompatible" : ""}`;
        const values: { [key: string]: number | string } = {};
        enumDescriptor.getValueList().forEach((value) => {
            values[value.getName().toUpperCase()] = webApiCompatible ? `"${value.getName().toUpperCase()}"` : value.getNumber();
        });

        return {
            indent,
            enumName,
            values,
        };
    }

}
