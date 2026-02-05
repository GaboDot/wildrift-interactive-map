import topLaner from '@images/TopLaner.png';
import jungler from '@images/Jungler.png';
import midLaner from '@images/MidLaner.png';
import adc from '@images/Adc.png';
import support from '@images/Support.png';

export type RoleType = 'top' | 'jungle' | 'mid' | 'adc' | 'support';

export const INITIAL_ROLES = [
    { id: 'top-1', role: 'top' as RoleType, x: 30, y: 35, color: 'blue' },
    { id: 'top-2', role: 'top' as RoleType, x: 35, y: 20, color: 'red' },
    { id: 'jungle-1', role: 'jungle' as RoleType, x: 50, y: 65, color: 'blue' },
    { id: 'jungle-2', role: 'jungle' as RoleType, x: 50, y: 25, color: 'red' },
    { id: 'mid-1', role: 'mid' as RoleType, x: 45, y: 50, color: 'blue' },
    { id: 'mid-2', role: 'mid' as RoleType, x: 53, y: 37, color: 'red' },
    { id: 'adc-1', role: 'adc' as RoleType, x: 60, y: 75, color: 'blue' },
    { id: 'adc-2', role: 'adc' as RoleType, x: 72, y: 55, color: 'red' },
    { id: 'support-1', role: 'support' as RoleType, x: 58, y: 75, color: 'blue' },
    { id: 'support-2', role: 'support' as RoleType, x: 72, y: 50, color: 'red' },
];

export const roleImages: Record<string, string> = {
  top: topLaner,
  jungle: jungler,
  mid: midLaner,
  adc: adc,
  support: support
};