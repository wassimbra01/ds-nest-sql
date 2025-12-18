import { SetMetadata } from '@nestjs/common';

// Key bech n7ottou fil metadata
export const IS_PUBLIC_KEY = 'isPublic';

// Decorator bech na3mlou endpoint public (ma y7tajjch authentication)
// Exemple: @Public() 3la endpoint register walla login
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
