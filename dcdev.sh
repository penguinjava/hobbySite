#!/bin/bash
set -euo pipefail

FILE="docker-compose.dev.yml"

usage() {
  cat <<'EOF'
Usage:
  ./dcdev.sh up [-d] [--build]
  ./dcdev.sh down [-v] [--rmi] [--orphans]
  ./dcdev.sh build [service] [--no-cache]
  ./dcdev.sh logs [service]
  ./dcdev.sh exec <service> [cmd...]
  ./dcdev.sh restart [service]
  ./dcdev.sh stop [service]
  ./dcdev.sh start [service]
  ./dcdev.sh ps
  ./dcdev.sh pull
  ./dcdev.sh rmi            # remove compose-built images (safe)
  ./dcdev.sh prune          # cleanup unused images/containers/networks (safe-ish)
  ./dcdev.sh prune-all      # prune including volumes (DANGER: deletes DB data)
Examples:
  ./dcdev.sh up -d --build
  ./dcdev.sh logs db
  ./dcdev.sh exec api sh
  ./dcdev.sh down --rmi
EOF
}

dc() {
  docker compose -f "$FILE" "$@"
}

CMD="${1:-help}"
shift || true

case "$CMD" in
  help|-h|--help)
    usage
    ;;

  up)
    # passthrough flags: -d --build etc.
    dc up "$@"
    ;;

  down)
    # supported convenience flags:
    #   -v          -> remove volumes (DB data 삭제!)
    #   --rmi       -> remove local images built by compose
    #   --orphans   -> remove orphan containers
    ARGS=()
    while [[ $# -gt 0 ]]; do
      case "$1" in
        -v|--volumes) ARGS+=("-v"); shift ;;
        --rmi)        ARGS+=("--rmi" "local"); shift ;;
        --orphans)    ARGS+=("--remove-orphans"); shift ;;
        *)            ARGS+=("$1"); shift ;;
      esac
    done
    dc down "${ARGS[@]}"
    ;;

  build)
    # ./dcdev.sh build [service] [--no-cache]
    dc build "$@"
    ;;

  logs)
    # ./dcdev.sh logs [service]
    SERVICE="${1:-}"
    if [[ -z "$SERVICE" ]]; then
      dc logs -f
    else
      dc logs -f "$SERVICE"
    fi
    ;;

  exec)
    # ./dcdev.sh exec <service> [cmd...]
    SERVICE="${1:-}"
    shift || true
    if [[ -z "$SERVICE" ]]; then
      echo "❌ exec requires a service name (e.g., api/web/db)"
      exit 1
    fi
    if [[ $# -eq 0 ]]; then
      # default shell
      dc exec "$SERVICE" sh
    else
      dc exec "$SERVICE" "$@"
    fi
    ;;

  restart)
    # ./dcdev.sh restart [service]
    if [[ $# -eq 0 ]]; then
      dc restart
    else
      dc restart "$1"
    fi
    ;;

  stop)
    # ./dcdev.sh stop [service]
    if [[ $# -eq 0 ]]; then
      dc stop
    else
      dc stop "$1"
    fi
    ;;

  start)
    # ./dcdev.sh start [service]
    if [[ $# -eq 0 ]]; then
      dc start
    else
      dc start "$1"
    fi
    ;;

  ps)
    dc ps
    ;;

  pull)
    dc pull
    ;;

  rmi)
    # 안전하게: compose가 만든 로컬 이미지만 제거 (컨테이너 먼저 down 권장)
    # 동작: docker compose down --rmi local 과 동일한 효과
    dc down --rmi local
    ;;

  prune)
    # unused 이미지/컨테이너/네트워크 정리 (볼륨은 보존)
    docker system prune -f
    ;;

  prune-all)
    # ⚠️ 볼륨까지 삭제 -> DB 데이터 날아감
    echo "⚠️ WARNING: This will delete volumes too (DB data will be lost)."
    docker system prune -f --volumes
    ;;

  *)
    echo "❌ Unknown command: $CMD"
    usage
    exit 1
    ;;
esac
