import introImage from "../../assets/image/intro_header.avif";

export default function IntroPart() {
  return (
    <div class="brief-intro-image">
      <img
        src={introImage}
        style={{width: "100vw", marginBottom:"10px"}}
      />
    </div>
  );
}
