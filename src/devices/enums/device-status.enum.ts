// هاذي الـ enum متاع حالة الجهاز (واش قاعد يصير فيه)

export enum DeviceStatus {
  // مازال مستني باش يبداو يصلحوه
  PENDING = 'PENDING',
  
  // قاعد يتصلح توا، التقني خدام عليه
  REPAIRING = 'REPAIRING',
  
  // تصلح و جاهز، الزبون ينجم يجي ياخذو
  READY = 'READY',
}
