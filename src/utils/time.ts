/**
 * 주어진 UTC ISO 문자열(예: "2025-12-07T13:52:31.519391Z")을
 * "지금 / 5분 전 / 10분 전 / 30분 전 / n시간 전 / n일 전" 으로 바꿔주는 함수
 */
export function formatRelativeTime(isoString: string): string {
  if (!isoString) return "";

  // JS Date는 밀리초(3자리)까지만 지원하니까, 소수점 3자리 이후는 잘라줌
  // "2025-12-07T13:52:31.519391Z" → "2025-12-07T13:52:31.519Z"
  const sanitized = isoString.replace(
    /(\.\d{3})\d+Z$/,
    "$1Z"
  );

  const target = new Date(sanitized);
  const now = new Date();

  if (isNaN(target.getTime())) {
    console.warn("Invalid date:", isoString);
    return "";
  }

  const diffMs = now.getTime() - target.getTime();

  // 미래인 경우(아직 안 지난 시간) 대충 "지금" 취급
  if (diffMs <= 0) {
    return "지금";
  }

  const diffMinutes = diffMs / 1000 / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  // 5분 이하 → "지금"
  if (diffMinutes <= 5) {
    return "지금";
  }

  // 5분 ~ 10분 → "5분 전"
  if (diffMinutes <= 10) {
    return "5분 전";
  }

  // 10분 ~ 30분 → "10분 전"
  if (diffMinutes <= 30) {
    return "10분 전";
  }

  // 30분 ~ 60분 → "30분 전"
  if (diffMinutes < 60) {
    return "30분 전";
  }

  // 1시간 ~ 24시간 → "n시간 전"
  if (diffHours < 24) {
    const hours = Math.floor(diffHours);
    return `${hours}시간 전`;
  }

  // 1일 이상 → "n일 전"
  const days = Math.floor(diffDays);
  return `${days}일 전`;
}
