import { PersonInput } from "@/types/compatibility";

type Props = {
  title: string;
  value: PersonInput;
  errors: Partial<Record<keyof PersonInput, string>>;
  onChange: (next: PersonInput) => void;
};

export default function PersonInputSection({ title, value, errors, onChange }: Props) {
  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>

      <div className="field">
        <label>이름 또는 닉네임</label>
        <input
          type="text"
          placeholder="예: 민지"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
        {errors.name ? <p className="error">{errors.name}</p> : null}
      </div>

      <div className="field">
        <label>생년월일</label>
        <input
          type="date"
          value={value.birthDate}
          onChange={(e) => onChange({ ...value, birthDate: e.target.value })}
        />
        {errors.birthDate ? <p className="error">{errors.birthDate}</p> : null}
      </div>

      <div className="field">
        <label>성별</label>
        <select
          value={value.gender}
          onChange={(e) => onChange({ ...value, gender: e.target.value as PersonInput["gender"] })}
        >
          <option value="">선택해 주세요</option>
          <option value="female">여성</option>
          <option value="male">남성</option>
        </select>
        {errors.gender ? <p className="error">{errors.gender}</p> : null}
      </div>

      <div className="field">
        <label>태어난 시간 (선택)</label>
        <input
          type="time"
          value={value.birthTime ?? ""}
          onChange={(e) => onChange({ ...value, birthTime: e.target.value })}
        />
        <p className="hint">모르면 비워도 됩니다.</p>
      </div>
    </section>
  );
}
