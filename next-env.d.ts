/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any
    }
  }
}

export {}
