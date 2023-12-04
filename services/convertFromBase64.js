export function convertFromBase64(string) {
    const stringBuffer = Buffer.from(string, 'base64');
    const utf8String = stringBuffer.toString('utf-8');

    return utf8String;
}