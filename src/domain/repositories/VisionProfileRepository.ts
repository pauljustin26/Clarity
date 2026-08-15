import type { VisionProfile } from '../models/VisionProfile';

export interface VisionProfileRepository {
  getActive(): Promise<VisionProfile | null>;
  save(profile: VisionProfile): Promise<void>;
}
