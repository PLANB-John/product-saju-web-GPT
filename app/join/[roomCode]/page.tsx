export default function JoinPage({ params }: { params: { roomCode: string } }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">room 참여 (준비중)</h1>
      <p className="text-[#666666]">입력된 room 코드: {params.roomCode}</p>
      <p className="text-[#666666]">실시간 동기화 기능은 추후 지원 예정입니다.</p>
    </div>
  );
}
