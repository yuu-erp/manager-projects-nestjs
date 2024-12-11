import { Injectable } from '@nestjs/common'

@Injectable()
export class SnowflakeService {
  private epoch: number // Mốc thời gian gốc
  private machineId: number // ID của máy chủ
  private sequence: number // Số thứ tự
  private lastTimestamp: number // Lưu timestamp cuối cùng được sử dụng

  constructor() {
    this.epoch = 1577836800000 // Epoch: 2020-01-01T00:00:00Z
    this.machineId = 1 // Machine ID (0 - 1023)
    this.sequence = 0 // Khởi tạo sequence là 0
    this.lastTimestamp = -1 // Khởi tạo timestamp
  }

  // Lấy thời gian hiện tại tính bằng mili-giây
  private getCurrentTimestamp(): number {
    return Date.now()
  }

  // Chờ đến khi mili-giây tiếp theo (để tránh trùng sequence)
  private waitNextMillisecond(currentTimestamp: number): number {
    while (currentTimestamp === this.lastTimestamp) {
      currentTimestamp = this.getCurrentTimestamp()
    }
    return currentTimestamp
  }

  // Hàm chính để tạo Snowflake ID
  generateId(): string {
    let currentTimestamp = this.getCurrentTimestamp()

    // Nếu timestamp hiện tại bằng timestamp trước đó, tăng sequence
    if (currentTimestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & 0xfff // Sequence chỉ được phép tối đa 12 bits (0-4095)

      // Nếu sequence vượt quá giới hạn, chờ đến mili-giây tiếp theo
      if (this.sequence === 0) {
        currentTimestamp = this.waitNextMillisecond(currentTimestamp)
      }
    } else {
      // Reset sequence nếu timestamp thay đổi
      this.sequence = 0
    }

    // Cập nhật timestamp cuối cùng
    this.lastTimestamp = currentTimestamp

    // Tính toán Snowflake ID
    const timestampPart = (currentTimestamp - this.epoch) << 22 // 41 bits
    const machineIdPart = this.machineId << 12 // 10 bits
    const sequencePart = this.sequence // 12 bits

    // Kết hợp thành Snowflake ID
    const snowflakeId = (
      timestampPart |
      machineIdPart |
      sequencePart
    ).toString()
    return snowflakeId
  }
}
