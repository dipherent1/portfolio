"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0c0c0c, 0.1)

    containerRef.current.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x4b70f5, 2)
    pointLight1.position.set(15, 15, 15)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x00ffad, 2)
    pointLight2.position.set(-15, -15, 15)
    scene.add(pointLight2)

    // Create wireframe objects
    const objects: THREE.Mesh[] = []

    // Wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(5, 16, 16)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4b70f5,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(-10, 5, -10)
    scene.add(sphere)
    objects.push(sphere)

    // Wireframe cube
    const cubeGeometry = new THREE.BoxGeometry(8, 8, 8)
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffad,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(10, -5, -15)
    scene.add(cube)
    objects.push(cube)

    // Wireframe torus
    const torusGeometry = new THREE.TorusGeometry(3, 1, 16, 50)
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    torus.position.set(0, 0, -20)
    scene.add(torus)
    objects.push(torus)

    // Create grid
    const gridHelper = new THREE.GridHelper(100, 50, 0x4b70f5, 0x00ffad)
    gridHelper.position.y = -20
    scene.add(gridHelper)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 3000

    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a more layered depth effect
      posArray[i] = (Math.random() - 0.5) * 100 // x
      posArray[i + 1] = (Math.random() - 0.5) * 100 // y
      posArray[i + 2] = (Math.random() - 0.5) * 150 - 50 // z (push more particles back)

      // Vary the size based on z-position (depth)
      const zPos = posArray[i + 2]
      scaleArray[i / 3] = THREE.MathUtils.mapLinear(zPos, -200, 50, 0.05, 0.5)
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    // Create shader material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
    })

    // Add color attribute to particles
    const colors = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a gradient from deep blue to mint green
      const t = Math.random()
      colors[i] = THREE.MathUtils.lerp(0.294, 0, t) // r (deep blue to mint green)
      colors[i + 1] = THREE.MathUtils.lerp(0.439, 1, t) // g
      colors[i + 2] = THREE.MathUtils.lerp(0.961, 0.678, t) // b
    }

    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create floating lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffad,
      transparent: true,
      opacity: 0.3,
    })

    const linesCount = 15
    const lines: THREE.Line[] = []

    for (let i = 0; i < linesCount; i++) {
      const lineGeometry = new THREE.BufferGeometry()
      const points = []

      const startX = (Math.random() - 0.5) * 100
      const startY = (Math.random() - 0.5) * 100
      const startZ = (Math.random() - 0.5) * 100

      const length = Math.random() * 20 + 10
      const segments = Math.floor(Math.random() * 5) + 3

      for (let j = 0; j <= segments; j++) {
        const t = j / segments

        // Create a slightly curved line
        points.push(
          new THREE.Vector3(
            startX + Math.sin(t * Math.PI * 2) * length * 0.2,
            startY + t * length,
            startZ + Math.cos(t * Math.PI * 2) * length * 0.2,
          ),
        )
      }

      lineGeometry.setFromPoints(points)
      const line = new THREE.Line(lineGeometry, linesMaterial)
      scene.add(line)
      lines.push(line)
    }

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Handle scroll effect
    let scrollY = 0

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate objects
      objects.forEach((obj) => {
        obj.rotation.x += 0.001
        obj.rotation.y += 0.002
      })

      // Rotate particles
      particlesMesh.rotation.y += 0.0003

      // Animate lines
      lines.forEach((line, i) => {
        line.rotation.x += 0.0005 * (i % 3 === 0 ? 1 : -1)
        line.rotation.z += 0.0003 * (i % 2 === 0 ? 1 : -1)
      })

      // Mouse movement effect - enhanced parallax
      particlesMesh.rotation.x += mouseY * 0.0002
      particlesMesh.rotation.y += mouseX * 0.0002

      // Move objects based on mouse for parallax effect
      objects.forEach((obj, i) => {
        obj.position.x += mouseX * 0.01 * (i % 2 === 0 ? 1 : -1)
        obj.position.y += mouseY * 0.01 * (i % 2 === 0 ? 1 : -1)
      })

      // Scroll effect - enhanced depth
      camera.position.y = -(scrollY * 0.0005)
      gridHelper.position.y = -20 + scrollY * 0.005

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

